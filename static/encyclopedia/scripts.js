const onLoad = () => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const toggler = document.getElementById('sidebar-toggler');

    overlay.addEventListener('click', () => {
        overlay.classList.toggle('toggled');
        sidebar.classList.toggle('toggled')     
    })

    document.getElementById('sidebar-toggler').addEventListener('click', () => {
        sidebar.classList.toggle('toggled');
        overlay.classList.toggle('toggled');  
    });


};

document.addEventListener('DOMContentLoaded', onLoad);