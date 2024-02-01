"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
    const [providers, setProviders] = useState (null);
      const [toggleDropDown, setToggleDropDown] = useState(false);

      useEffect (() => {
        const setProviders = async () => {
          const response = await getProviders();

          setProviders(response);
        }
        setProviders();
      })
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        

        />
        <p className="logo_text font-bold">Promptopia</p>
      </Link>
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-5 md:gap-5">
            <Link href="/create-prompt"
            className="black_btn hover:bg-white hover:text-black text-white font-inter">
            Create Post
            </Link>

            <button type="button" onClick={signOut}
            className="outline_btn hover:bg-black hover:text-white text-black font-inter">
              Sign Out
            </button>

            <Link href="/Profile">
              <Image
                 src="/assets/images/logo.svg"
                 width={37}
                 height={37}
                 className="rounded full"
                 alt="profile"
              />
            </Link>
            </div>
        ): (
          <>
          {providers &&
            Object.values(providers).map((provider) => (
 
              <button
                 type="button"
                 key={provider.name}
                 onClick={() => signIn(provider.id)}
                 className="black_btn"
              >
                Sign In
              </button>
            )
          
          )}
          </>
        )
        }

      </div>

      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
                 src="/assets/images/logo.svg"
                 width={37}
                 height={37}
                 className="rounded full"
                 alt="profile"
                 onClick={() => setToggleDropDown
                ((prev) => !prev )}
              />
              {toggleDropDown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropDown
                    (false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropDown
                    (false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropDown(false);
                      signOut();
                    }}
                    className="mt-5 w-full flex black_btn shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0 w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm;
                  ;"
                  >
                    Sign Out
                  </button>
                  </div>
              )
                
              }

          </div>
        ): (
          <>
          {providers &&
            Object.values(providers).map((provider) => (
 
              <button
                 type="button"
                 key={provider.name}
                 onClick={() => signIn(provider.id)}
                 className="black_btn"
              >
                Sign In
              </button>
            )
          
          )}
          </>

        )}

      </div>

    </nav>
  )
}

export default Nav
