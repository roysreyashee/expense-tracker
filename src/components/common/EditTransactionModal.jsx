export default function EditTransactionModal({

  children,

  onClose

}) {

  return (

    <div className="
      fixed
      inset-0
      bg-black/50
      z-50

      flex
      items-center
      justify-center

      p-4
    ">

      {/* Modal Box */}
      <div className="
        bg-white

        w-full
        max-w-3xl

        max-h-[90vh]

        overflow-y-auto

        rounded-2xl

        shadow-xl

        relative
      ">

        {/* Close Button */}
        <button

          onClick={onClose}

          className="
            absolute
            top-4
            right-4

            text-slate-500
            hover:text-black

            text-2xl
          "
        >
          ×
        </button>

        {/* Modal Content */}
        <div className="p-6">

          {children}

        </div>

      </div>

    </div>
  )
}