import Swal from 'sweetalert2'

export default Swal.mixin({
  buttonsStyling: false,
  customClass: {
    popup: 'modal-box',
    title: 'text-slate-900 dark:text-slate-200 font-bold',
    htmlContainer: 'text-slate-900 dark:text-slate-200',
    confirmButton: 'btn btn-primary m-2',
    denyButton: 'btn btn-error m-2',
    cancelButton: 'btn btn-neutral m-2'
  }
})
