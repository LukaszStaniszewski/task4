const FormInput = ({ label, ...otherProps }) => (

    <div className="relative my-10 mx-0">
      <input className="w-full px-2.5 py-2.5 my-6  text-stone-800 block 
      border-b boder-solid border-zinc-400 rounded-none focus:outline-none" {...otherProps}/>
      {
        label && <label className={`${otherProps.value.length
        ? ' -translate-y-9 text-slate-400'
        : ''} 
        focus:-translate-y-9 focus:text-slate-400 text-slate-800 absolute pointer-events-none left-1.5 top-2.5 
        transition-transform ease-in-out duration-300 `}>{label}</label>
      }
  </div>
 
)

export default FormInput;
