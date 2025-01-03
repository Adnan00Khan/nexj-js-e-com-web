import Link from 'next/link';

type NavbarProps = {
  cartCount: number;
};

export default function Navbar({ cartCount }: NavbarProps) {
  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold ">E-Commerce Site</h1>
     
        <div >
        <Link href="/">
          <h1 className="mr-6 pr-40">Home</h1>
        </Link></div>
        <div className='flex '>
        <Link href="/cart">
          <h1 className="relative w-14">
            Cart
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </h1>
        </Link></div>
        
    </header>
  );
}