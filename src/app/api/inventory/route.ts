import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ProductWithInventory } from '@/lib/types';

/**
 * GET /api/inventory
 * Fetch all products with their inventory information
 * Joins products table with inventory table
 */
export async function GET() {
  try {
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

    // Fetch all products with their inventory data
    const { data: productsData, error: productsError } = await supabase
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
      .eq('status', 'active')
      .order('name', { ascending: true });

    if (productsError) {
      console.error('[Inventory GET] Database error:', productsError);
      return NextResponse.json(
        { error: 'Failed to fetch inventory data' },
        { status: 500 }
      );
    }

    const products: ProductWithInventory[] = (productsData || []).map(
      (product: any) => ({
        ...product,
        inventory: product.inventory?.[0] || null,
      })
    );

    return NextResponse.json({ products });
  } catch (error) {
    console.error('[Inventory GET] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/inventory
 * Add a new product with inventory data (admin only)
 */
export async function POST(request: NextRequest) {
  try {
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
    const {
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
      quantity_on_hand = 0,
      low_stock_threshold = 10,
      reorder_point = 5,
    } = body;

    // Validate required fields
    if (!sku || !name || !category || wholesale_price_cents === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: sku, name, category, wholesale_price_cents' },
        { status: 400 }
      );
    }

    // Create the product
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([
        {
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
          image_urls: image_urls || [],
          status: 'active',
        },
      ])
      .select()
      .single();

    if (productError) {
      console.error('[Inventory POST] Product creation error:', productError);
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }

    // Create the inventory record
    const { data: inventory, error: inventoryError } = await supabase
      .from('inventory')
      .insert([
        {
          product_id: product.id,
          quantity_on_hand,
          quantity_reserved: 0,
          low_stock_threshold,
          reorder_point,
        },
      ])
      .select()
      .single();

    if (inventoryError) {
      console.error('[Inventory POST] Inventory creation error:', inventoryError);
      return NextResponse.json(
        { error: 'Failed to create inventory record' },
        { status: 500 }
      );
    }

    const result: ProductWithInventory = {
      ...product,
      inventory,
    };

    return NextResponse.json({ product: result }, { status: 201 });
  } catch (error) {
    console.error('[Inventory POST] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
