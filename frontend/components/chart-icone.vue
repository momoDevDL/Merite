<template>
    <div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.21 15.89C20.5738 17.3945 19.5788 18.7202 18.3119 19.7513C17.045 20.7824 15.5448 21.4874 13.9424 21.8048C12.3401 22.1222 10.6844 22.0422 9.12015 21.5718C7.55587 21.1015 6.13062 20.2551 4.96902 19.1067C3.80741 17.9583 2.94481 16.5428 2.45663 14.984C1.96846 13.4252 1.86956 11.7705 2.1686 10.1647C2.46763 8.5588 3.1555 7.05064 4.17205 5.77205C5.1886 4.49345 6.50288 3.48333 8 2.83002" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    </div>
</template>

<script>
export default {
    props : ['active','number'],
    computed : {
        color() {
            if (this.active == this.number) {
                return "#fff"
            } else {
                return "#000"
            }
        }
    }
}
</script>