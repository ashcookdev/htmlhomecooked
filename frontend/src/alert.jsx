import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { DataStore } from 'aws-amplify'
import { HomeCookedCollection } from './models'
import { Auth } from 'aws-amplify'
import { set } from 'date-fns'


export default function Example() {
  const [open, setOpen] = useState(false)
    const [email, setEmail] = useState(null)
    const [order, setOrder] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        Auth.currentAuthenticatedUser().then(user => {
            setEmail(user.attributes.email)
            setUser(user)
        })
    }

    , [])

    useEffect(() => {
        fetchUser()
    }
    , [user])


const fetchUser = async () => {
    const user = await DataStore.query(HomeCookedCollection) // returns all the records
    const filterEmail = user.filter(user => user.Email === user && user.Completed === true && user.Delieved === false)
    setOrder(filterEmail)
    setOpen(true)
console.log(filterEmail)

}


useEffect(() => {
    const subscription = DataStore.observe(HomeCookedCollection).subscribe(msg => {
        console.log('DataStore.observe(HomeCookedCollection).subscribe():', msg.model, msg.opType, msg.element)
    })

    return () => subscription.unsubscribe()

}, [])



    




  return (
    <Transition.Root show={open} as={Fragment}>
<Dialog as="div" className="relative z-10" onClose={setOpen} static={true}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <LockClosedIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                     Food Is Ready To Pick Up
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                      Please pick up your food from: Unit G11, Powerhub Business Centre, Maidstone ME16 0ST.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                 
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
