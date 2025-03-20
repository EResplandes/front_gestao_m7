<script setup>
function smoothScroll(id) {
    document.body.click();
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}
</script>

<template>
    <a class="flex items-center" href="#">
        <img width="50" alt="logo" src="../../../public/logo.jpg" class="mr-2" />
        <div class="h-12 mr-2">

        </div>
        <span class="text-surface-900 dark:text-surface-0 font-medium text-2xl leading-normal mr-20">GESTÃO
            GABINETE</span>
    </a>
</template>
