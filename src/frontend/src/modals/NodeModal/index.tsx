import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useContext, useRef, useState } from "react";
import { PopUpContext } from "../../contexts/popUpContext";
import { NodeDataType } from "../../types/flow";
import { nodeColors, nodeIcons, toNormalCase } from "../../utils";
import { typesContext } from "../../contexts/typesContext";
import ModalField from "./components/ModalField";

export default function NodeModal({ data }: { data: NodeDataType }) {
  const [open, setOpen] = useState(true);
  const { closePopUp } = useContext(PopUpContext);
  const { types } = useContext(typesContext);
  const ref = useRef();
  function setModalOpen(x: boolean) {
    setOpen(x);
    if (x === false) {
      setTimeout(() => {
        closePopUp();
      }, 300);
    }
  }
  const Icon = nodeIcons[types[data.type] ?? "custom"];
  return (
    <Transition.Root show={open} appear={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={setModalOpen}
        initialFocus={ref}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-600 dark:bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative flex h-[600px] w-[700px] transform flex-col justify-between overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-800 sm:my-8">
                <div className=" absolute right-0 top-0 z-50 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md text-gray-400 hover:text-gray-500"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <div className="z-10 flex w-full justify-center pb-4 shadow-sm">
                    <Icon
                      className="mt-4 h-10 w-10 rounded p-1"
                      style={{
                        color:
                          nodeColors[types[data.type]] ?? nodeColors.custom,
                      }}
                    />
                    <div className="mt-4 text-center sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-10 text-gray-900 dark:text-white"
                      >
                        {data.type}
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="flex h-full w-full flex-row items-center justify-center overflow-clip gap-4 bg-gray-200 p-4 dark:bg-gray-900">
                    <div className="flex h-full w-full">
                      <div className="w-full overflow-scroll scrollbar-hide rounded-lg bg-white px-4  shadow dark:bg-gray-800">
                        <div className="flex h-full flex-col gap-5">
                          <br />
                          {Object.keys(data.node.template)
                            .filter(
                              (t) =>
                                t.charAt(0) !== "_" &&
                                data.node.template[t].advanced &&
                                data.node.template[t].show
                            )
                            .map((t: string, idx) => {
                              return (
                                <ModalField
                                  key={idx}
                                  data={data}
                                  title={
                                    data.node.template[t].display_name
                                      ? data.node.template[t].display_name
                                      : data.node.template[t].name
                                        ? toNormalCase(data.node.template[t].name)
                                        : toNormalCase(t)
                                  }
                                  required={data.node.template[t].required}
                                  id={
                                    data.node.template[t].type +
                                    "|" +
                                    t +
                                    "|" +
                                    data.id
                                  }
                                  name={t}
                                  type={data.node.template[t].type}
                                />
                              );
                            })}
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-row-reverse bg-gray-200 px-4 pb-3 dark:bg-gray-900">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setModalOpen(false);
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
