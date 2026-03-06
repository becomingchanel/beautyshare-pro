import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ProductWithInventory } from '@/lib/types';

/**
 * GET /api/inventory/[id]
 * Fetch a single product with its inventory information
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch product with inventory
    const { data: product, error: productError } = await supabase
      .from('products')
      .select(`
        id,
        sku,
        name,
        description,
        category,
        hair_type,
        texture,
        length,
        color,
        wholesale_price_cents,
        suggested_retail_cents,
        minimum_retail_cents,
        weight_oz,
        image_urls,
        status,
        created_at,
        updated_at,
        inventory:inventory(*)
      `)
      .eq('id', id)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const result: ProductWithInventory = {
      ...product,
      inventory: product.inventory?.[0] || null,
    };

    return NextResponse.json({ product: result });
  } catch (error) {
    console.error('[Inventory GET [id]] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/inventory/[id]
 * Adjust inventory stock levels for a product (admin only)
 * 
 * Request body:
 * {
 *   adjustment_type: 'restock' | 'write_off' | 'correction',
 *   quantity: number,
 *   notes?: string
 * }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { adjustment_type, quantity } = body;

    // Validate required fields
    if (!adjustment_type || quantity === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: adjustment_type, quantity' },
        { status: 400 }
      );
    }

    if (!['restock', 'write_off', 'correction'].includes(adjustment_type)) {
      return NextResponse.json(
        { error: 'Invalid adjustment_type. Must be restock, write_off, or correction' },
        { status: 400 }
      );
    }

    // Fetch current inventory
    const { data: inventory, error: inventoryError } = await supabase
      .from('inventory')
      .select('*')
      .eq('product_id', id)
      .single();

    if (inventoryError || !inventory) {
      return NextResponse.json(
        { error: 'Inventory record not found' },
        { status: 404 }
      );
    }

    // Calculate new quantity based on adjustment type
    let newQuantity = inventory.quantity_on_hand;

    if (adjustment_type === 'restock') {
      // Add to current quantity
      newQuantity = inventory.quantity_on_hand + quantity;
    } else if (adjustment_type === 'write_off') {
      // Subtract from current quantity
      newQuantity = Math.max(0, inventory.quantity_on_hand - quantity);
    } else if (adjustment_type === 'correction') {
      // Set to exact quantity
      newQuantity = quantity;
    }

    // Update inventory
    const { data: updatedInventory, error: updateError } = await supabase
      .from('inventory')
      .update({
        quantity_on_hand: newQuantity,
        last_restock_date: new Date().toISOString(),
        last_restock_quantity: adjustment_type === 'restock' ? quantity : null,
      })
      .eq('product_id', id)
      .select()
      .single();

    if (updateError) {
      console.error('[Inventory PATCH] Update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update inventory' },
        { status: 500 }
      );
    }

    return NextResponse.json({ inventory: updatedInventory });
  } catch (error) {
    console.error('[Inventory PATCH] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
