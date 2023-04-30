const PLAYER_STORAGE_KEY = 'QUANGHAIPLAYER';

const cd = document.querySelector('.cd');
const heading = document.querySelector('header h2');
const cdThumb = document.querySelector('.cd-thumb');
const audio = document.querySelector('#audio');
const playBtn = document.querySelector('.btn-toggle-play');
const player = document.querySelector('.player');
const progress = document.querySelector('.progress');
const nextBtn = document.querySelector('.btn-next');
const prevBtn = document.querySelector('.btn-prev');
const randomBtn = document.querySelector('.btn-random');
const repeatBtn = document.querySelector('.btn-repeat');
const playList = document.querySelector('.playlist');





const app = {

    currentIndex: 0,
    isplaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    songs: [
        {
            name: "Có Chắc Yêu Là Đây",
            singer: "SonTungMTP",
            path: "./assets/music/CoChacYeuLaDayOnionnRemix-SonTungMTPOnionn-7022615.mp3",
            image: "https://vtv1.mediacdn.vn/thumb_w/640/2020/7/1/10557109736788311521305612978536702186437657o-159360983323639925423.jpg"
        },
        {
            name: "Cuối Cùng Thì",
            singer: "JackJ97",
            path: "./assets/music/CuoiCungThiCukakRemix-JackJ97-8245961.mp3",
            image:
                "https://congluan-cdn.congluan.vn/files/content/2022/11/06/4122-jack-tro-lai-showbiz-viet-bang-live-stage-cuon-hut-co-dien-hien-dai-084106575.jpg"
        },
        {
            name: "Em Đã Xa Anh",
            singer: "NamDuc",
            path: "./assets/music/EmDaXaAnhBiboRemix-NamDuc-7794269.mp3",

            image: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/7/f/5/5/7f55e49676fcfe70f663573ac49df90c.jpg"
        },
        {
            name: "Khuất Lối",
            singer: "HKray",
            path: "./assets/music/KhuatLoiOrinnRemix-HKray-8494322.mp3",
            image:
                "https://lyricvn.com/wp-content/uploads/2022/12/0a542ce401be49c5ea47edee1a25dcf1.jpg"
        },
        {
            name: "Quả Phụ Tướng ",
            singer: "DungHoangPham",
            path: "./assets/music/QuaPhuTuongRemix-DungHoangPhamSinkra-8471408.mp3",
            image:
                "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6nGmQomRniuclvf7mQPfL_HV5ihnfkO8hlJ7qVOB1Fpqdhw1YvcE_s6tWqhapJsKjsYgQDw8Py_kN86BLrd4ui5K_fPpmuroGcqZ4oj6pqLblzwGm8fTxIP29iJXcCVL2tvkOAZPjd0Z3seercTZMPqAUVS0GeXG5rkR1TIYiW7XrA5QvzBA4M_eoyg/s1080/IMG_20221222_150139.jpg"
        },
        {
            name: "Tết Bình An",
            singer: "HanaCamTien",
            path: "./assets/music/TetBinhAnOrinnRemix-HanaCamTien-8525568.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/mv/2021/02/16/7/4/0/3/1613486666858_640.jpg"
        },
        {
            name: "Trót Trao Duyên",
            singer: "NB3HoaiBao",
            path: "./assets/music/TrotTraoDuyenBiBoRemix-NB3HoaiBao-8313787.mp3",
            image:
                "https://baochauelec.com/cdn/images/tin-tuc/loi-bai-hat-trot-trao-duyen-nb3-hoai-bao-ban-chuan.jpg"
        },
        {
            name: "Vương Vấn",
            singer: "HanaCamTien",
            path: "./assets/music/VuongVanQinnRemix-HanaCamTienTVkLeGiaQuan-7846985.mp3",
            image:
                "https://phuotdi.vn/wp-content/uploads/2022/04/vuong-van-remix.jpg"
        }
    ],

    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    render: function () {
        html = this.songs.map(function (song, index) {
            return `
         <div class="song ${index === app.currentIndex ? 'active' : ''}" data-index=${index}>
          <div
            class="thumb"
            style="
              background-image: url('${song.image}');
            "
          ></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
        `
        })
        playList.innerHTML = html.join('');

    },
    handleEvents: function () {
        _this = this;

        // xử lý cd quay và dừng
        var cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAnimate.pause()
        // xử lý phóng to thu nhỏ
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;

        }

        // xử lý khi clickPlay
        playBtn.onclick = function () {

            if (_this.isplaying) { // false
                audio.pause();
            }
            else {
                audio.play();

            }

        }
        // khi song được play
        audio.onplay = function () {
            _this.isplaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        // khi song bị pause
        audio.onpause = function () {
            _this.isplaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }
        // khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent;
            }
        }
        // xử lý khi tua song
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }
        // khi nextsong
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            }
            else {

                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        // khi prevSong
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {

                _this.prevSong();
            }
            audio.play();
            _this.render();
        }
        // khi random song
        randomBtn.onclick = function (e) {
            if (_this.isRandom) {

                _this.isRandom = false;
                randomBtn.classList.remove('active');
                _this.setConfig('isRandom', _this.isRandom)


            } else {
                _this.isRandom = true;
                _this.setConfig('isRandom', _this.isRandom);
                randomBtn.classList.add('active');

            }
        }
        //xử lý  next song khi adio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();

            } else {

                nextBtn.click();
            }
        }
        // xử lý khi phát lại
        repeatBtn.onclick = function () {
            if (_this.isRepeat) {
                _this.isRepeat = false;
                repeatBtn.classList.remove('active');
                _this.setConfig('isRepeat', _this.isRepeat);
            }
            else {
                _this.isRepeat = true;
                repeatBtn.classList.add('active');
                _this.setConfig('isRepeat', _this.isRepeat);
            }
        }
        // lắng nghe click vào playlist
        playList.onclick = function (e) {
            if (e.target.closest('.song:not(.active') || (e.target.closest('.option'))) {
                // xử lý khi click vào song
                if (e.target.closest('.song:not(.active')) {
                    _this.currentIndex = Number.parseInt(e.target.closest('.song:not(.active').getAttribute('data-index'));
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();

                }

            }
        }

    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;


    },
    scrollToActiveSong: function () {
        setTimeout(function () {
            document.querySelector('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',

            })

        }, 300)
    },

    getCurrentSong: function () {
        return this.songs[this.currentIndex];
    },
    loadCurrentSong: function () {

        heading.textContent = this.getCurrentSong().name;
        cdThumb.style.backgroundImage = `url(${this.getCurrentSong().image})`;
        audio.src = this.getCurrentSong().path;


    },
    // next song
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()

    },
    // prevsong
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong()

    },
    // play random
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },



    start: function () {
        //gán cấu hình từ config vào ứng dụng
        this.loadConfig();
        this.render();
        // Lắng nghe và sử lý các sự kiện
        this.handleEvents();
        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();
        // hiển thị trạng thái ban đầu của bot


    }
}

app.start()
