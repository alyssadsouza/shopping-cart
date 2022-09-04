import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Cart } from "../pages/Cart";
import categories from "../data/categories.json";
import { useShoppingCart } from "../context/CartContext";

const navigation = categories.sort((a, b) => {
  if (a.category.toLowerCase() > b.category.toLowerCase()) {
    return 1;
  } else if (a.category.toLowerCase() < b.category.toLowerCase()) {
    return -1;
  }
  return 0;
});

function classNames(...classes: Array<String>) {
  return classes.filter(Boolean).join(" ");
}

export function Nav() {
  const { cartQuantity } = useShoppingCart();

  const currentPath = useLocation()?.pathname;

  return (
    <Disclosure as="nav" className="bg-white border w-full sticky top-0">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="./logo.svg"
                    alt="Store Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="./logo.svg"
                    alt="Store Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.category}
                        to={item.path}
                        className={classNames(
                          item.path === currentPath
                            ? "text-indigo-400"
                            : "hover:text-indigo-400",
                          "px-3 py-2 rounded-md text-sm font-medium text-gray-700 transition-all"
                        )}
                        aria-current={
                          item.path === currentPath ? "page" : undefined
                        }
                      >
                        {item.category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Cart dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full text-xs focus:outline-none">
                      <span className="sr-only">Open user menu</span>
                      <ShoppingCartIcon className="block h-6 w-6 text-gray-600 outline outline-1 outline-gray-300 hover:outline-gray-400 transition-all outline-offset-8 rounded-full" />
                      {cartQuantity > 0 && (
                        <div className="absolute bottom-0 right-0 translate-x-[0.5rem] translate-y-[0.5rem] w-4 h-4 bg-red-500 text-white rounded-full text-[0.6rem]">
                          {cartQuantity}
                        </div>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-4 w-[70vw] lg:w-[40vw] origin-top-right rounded-md bg-white pb-0 shadow-lg border h-[80vh] flex flex-col justify-between">
                      <Menu.Item>
                        <Cart preview />
                      </Menu.Item>
                      <div className="flex flex-row justify-between items-center border-t px-4">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/cart"
                              className={classNames(
                                active ? "text-indigo-400" : "",
                                "block px-4 py-2 m-2 text-sm text-gray-700 border hover:border-indigo-300 transition-all"
                              )}
                            >
                              View Cart
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/checkout"
                              className={classNames(
                                active ? "text-indigo-400" : "",
                                "block px-4 py-2 m-2 text-sm text-gray-700 border hover:border-indigo-300 transition-all"
                              )}
                            >
                              Checkout
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {/* Mobile nav */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link
                  key={item.category}
                  to={item.path}
                  className={classNames(
                    item.path === currentPath
                      ? "text-indigo-400"
                      : "hover:text-indigo-400",
                    "block px-3 py-2 rounded-md text-base font-medium text-gray-600 transition-all"
                  )}
                  aria-current={item.path === currentPath ? "page" : undefined}
                >
                  {item.category}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
