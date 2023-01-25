

window.onload = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.register === 'success') {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Creaste exitosamente un usuario!`,
            showConfirmButton: false,
            timer: 2000,
            toast: true
          })
    }
}