import Link from 'next/link';



export default function Navbar() {
  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold ">E-Commerce Site</h1>
     
        <div >
        <Link href="/">
          <h1 className="mr-6 lg:pr-40">Home</h1>
        </Link></div>
        <div className='flex '>
        <Link href="/cart">
          <h1 className="relative w-14">
            Cart
          </h1>
        </Link></div>
        
    </header>
  );
}