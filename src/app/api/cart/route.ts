// pages/api/cart.ts

import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/auth';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // Fetch the cart items for the user
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: { CartItem: true },
    });

    return NextResponse.json(cart?.CartItem || []);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const { productId, quantity } = await request.json();

  if (!productId || !quantity) {
    return NextResponse.json({ error: 'Product ID and quantity are required' }, { status: 400 });
  }

  try {
    // Check if the cart exists for the user
    let cart = await prisma.cart.findFirst({
      where: { userId },
      include: { CartItem: true },
    });

    if (!cart) {
      // Create a new cart for the user if it doesn't exist
      cart = await prisma.cart.create({
        data: { userId },
        include: { CartItem: true },
      });
    }

    // Check if the product already exists in the cart
    const existingCartItem = cart.CartItem.find((item) => item.productId === productId);

    if (existingCartItem) {
      // Update the quantity of the existing cart item
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      // Add the new product to the cart
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    return NextResponse.json({ message: 'Product added to cart' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const { productId } = await request.json();

  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  try {
    // Find the cart for the user
    const cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Delete the cart item
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    return NextResponse.json({ message: 'Product removed from cart' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const { productId, action } = await request.json();

  if (!productId || !action) {
    return NextResponse.json({ error: 'Product ID and action are required' }, { status: 400 });
  }

  try {
    // Find the cart for the user
    const cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }

    if (action === 'increment') {
      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + 1 },
      });
    } else if (action === 'decrement') {
      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: Math.max(cartItem.quantity - 1, 0) },
      });
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Cart item updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
