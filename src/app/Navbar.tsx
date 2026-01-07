import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar px-8">
      <div className="flex-1">
        <span className="text-lg font-medium tracking-wide">
          Nodemailer App
        </span>
      </div>
      <div>
        <Link href="/contact" className="btn btn-sm btn-outline">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
