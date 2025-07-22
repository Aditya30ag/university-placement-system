'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function HomePage() {
  useEffect(() => {
    // Redirect to dashboard by default
    redirect('/dashboard');
  }, []);

  return null;
}
