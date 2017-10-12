const AnimeAnims = {
    'startHidden': {
        targets: '.ff7',
        opacity: 0,
        duration: 1
    },
    'fadeIn': {
        targets: '.ff7',
        opacity: [0, 1],
        bounce: 0,
        easing: 'linear',
        duration: 100,
        autoplay: false
    },
    'fadeOut': {
        targets: '.ff7',
        opacity: [1, 0],
        bounce: 0,
        easing: 'linear',
        duration: 100,
        autoplay: false
    }
};

export default AnimeAnims;