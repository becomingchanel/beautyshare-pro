import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, store_id')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Fetch order
    const { data: order, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        order_items (
          id,
          product_id,
          quantity,
          price,
          products (
            id,
            name,
            image_url
          )
        ),
        stores (
          id,
          name
        )
        `
      )
      .eq('id', id)
      .single();

    if (error || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check access: admin can see all, subscriber only their store
    if (profile.role === 'subscriber' && order.store_id !== profile.store_id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user profile to check role (admin only)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, store_id')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    if (profile.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can update orders' },
        { status: 403 }
      );
    }

    // Verify order exists and admin can access it
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, store_id')
      .eq('id', id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const {
      order_status,
      payment_status,
      fulfillment_status,
      tracking_number,
      tracking_carrier,
    } = body;

    const updates: any = {};

    if (order_status) updates.order_status = order_status;
    if (payment_status) updates.payment_status = payment_status;
    if (fulfillment_status) updates.fulfillment_status = fulfillment_status;
    if (tracking_number) updates.tracking_number = tracking_number;
    if (tracking_carrier) updates.tracking_carrier = tracking_carrier;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select(
        `
        *,
        order_items (
          id,
          product_id,
          quantity,
          price,
          products (
            id,
            name,
            image_url
          )
        ),
        stores (
          id,
          name
        )
        `
      )
      .single();

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
