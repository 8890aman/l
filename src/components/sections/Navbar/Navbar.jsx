import React from "react";
import { Typography, Button, Input } from "@material-tailwind/react";

const Navbar = () => {
  return (
    <div className="bg-white w-full border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7e57c2] rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-full"></div>
              </div>
              <Typography as="span" className="font-pixel text-xl text-slate-800 tracking-wider">
                PixelVerse
              </Typography>
            </div>
            
            {/* Main Navigation */}
            <div className="hidden md:flex items-center gap-10">
              <Typography as="a" href="#" className="font-pixel text-slate-700 hover:text-slate-900">
                Explore
              </Typography>
              <Typography as="a" href="#" className="font-pixel text-slate-700 hover:text-slate-900">
                Collections
              </Typography>
              <Typography as="a" href="#" className="font-pixel text-slate-700 hover:text-slate-900">
                Create
              </Typography>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative w-80 hidden md:block">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full h-9 pl-10 pr-4 rounded-full bg-gray-50 border border-slate-200 text-sm text-slate-700 font-pixel focus:outline-none focus:ring-1 focus:ring-[#7e57c2] focus:border-[#7e57c2]"
            />
          </div>
          
          {/* Right Side Elements */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-pixel text-[8px]">3</span>
              </div>
              <button className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
            
            {/* Connect Wallet */}
            <Button
              className="bg-[#7e57c2] hover:bg-[#6a41b4] text-white font-pixel text-xs py-2 px-4 rounded-full h-9 flex items-center shadow-sm"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 