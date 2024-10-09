'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const HomePage = () => {
  const [message, setMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectStatus = searchParams.get('redirect_status');

    if (redirectStatus === 'succeeded') {
      setMessage('The payment was successful');
      localStorage.removeItem('paymentIntentId');
    } else if (redirectStatus === 'failed') {
      setMessage('The payment failed');
    }
  }, [searchParams]);

  return (
    <>
      <h1>This is the home page</h1>
      <Link href='/checkout'>Go to the checkout page</Link>
      {message && <span>{message}</span>}
    </>
  );
};

export default HomePage;
