import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShieldCheckIcon, UsersIcon } from "@heroicons/react/20/solid";

const navigation = {
  categories: [
    {
      id: "Accueil",
      name: "Accueil",
      to: "/accueil",
    },
    {
      id: "Immatriculation",
      name: "Immatriculation",
    },
  ],
  pages: [
    {
      name: "DGI",
      href: "https://hetraonline.impots.mg/Accueil/papier_inscri",
    },
    { name: "Contact", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DefaultLayout() {
  const [open, setOpen] = useState(false);

  const solutions = [
    {
      name: "Client",
      description:
        "cliquez ici si vous etes un client qui a deja un NIF et un mot de passe",
      href: "/loginclient",
      icon: UsersIcon,
    },
    {
      name: "Administrateur",
      description:
        "Cliquez ici si vous etes enregistrer en tant que Administrateur",
      href: "/loginadmi",
      icon: ShieldCheckIcon,
    },
  ];
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setOpen}
        ></Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex items-center h-16 ">
              <button
                type="button"
                className="relative p-2 text-gray-400 bg-white rounded-md lg:hidden"
                onClick={() => setOpen(true)}
              >
                {/* ... */}
              </button>

              {/* Logo */}
              <div className="flex ml-4 lg:ml-0">
                <img
                  className="w-auto h-9"
                  src="/finance.png"
                  alt="finance"
                  style={{ width: "100px", height: "50px" }}
                />
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Link
                              key={category.id}
                              to={category.to}
                              className={classNames(
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out",
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800"
                              )}
                            >
                              {category.name}
                            </Link>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 text-sm text-gray-500 top-full">
                              {/* ... */}
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="flex items-center ml-auto">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Popover className="relative">
                    <Popover.Button className="inline-flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-1">
                      <span>Connexion</span>
                      <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 flex w-screen px-4 mt-5 -translate-x-1/2 left-1/2 max-w-max">
                        <div className="flex-auto w-screen max-w-md overflow-hidden text-sm leading-6 bg-white shadow-lg rounded-3xl ring-1 ring-gray-900/5">
                          <div className="p-4">
                            {solutions.map((item) => (
                              <div
                                key={item.name}
                                className="relative flex p-4 rounded-lg group gap-x-6 hover:bg-gray-50"
                              >
                                <div className="flex items-center justify-center flex-none mt-1 rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white">
                                  <item.icon
                                    className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div>
                                  <a
                                    href={item.href}
                                    className="font-semibold text-gray-900"
                                  >
                                    {item.name}
                                    <span className="absolute inset-0" />
                                  </a>
                                  <p className="mt-1 text-gray-600">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                  <span className="w-px h-6 bg-gray-200" aria-hidden="true" />
                  <Link
                    to="/loginclient"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Creer compte
                  </Link>

                  <img
                    className="w-auto h-8"
                    src="/DGI.png"
                    alt="DGI"
                    style={{ width: "150px", height: "80px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      {/*<footer>
        <div className="bg-gray-500 ">
          <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
                bas de page
              </h2>
            </div>
          </div>
        </div>
                            </footer>*/}
    </div>
  );
}
