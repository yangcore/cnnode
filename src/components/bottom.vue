<template>
    <mu-paper >
        <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
            <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video" />
            <mu-bottom-nav-item value="music" title="Music" icon="music_note" />
            <mu-bottom-nav-item value="books" title="Books" icon="books" />
            <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo" />
        </mu-bottom-nav>
    </mu-paper>
</template>

<script>
export default {
    name: "bottom",
    data() {
        return {
            bottomNav: 'movies',
            bottomNavColor: 'movies'
        }
    },
    methods: {
        handleChange(val) {
            this.bottomNav = val
        }
    }
}
</script>

<style lang="scss">
    @charset "utf-8";
@function pxx($px, $base-font-size: 75px) {
  @if (unitless($px)) {
    @return pxx($px + 0px); // That may fail.
  }
  @else if (unit($px)==rem) {
    @return $px;
  }
  @return ($px / $base-font-size) * 1rem;
}

@mixin font-dpr($font-size) {
  font-size: $font-size / 2;

  [data-dpr="2"] & {
    font-size: $font-size;
  }

  [data-dpr="3"] & {
    font-size: $font-size * 1.5;
  }
}

@mixin px-dpr($property, $size, $others:"") {

  #{$property}: $size / 2 #{$others};

  [data-dpr="2"] & {
    #{$property}: $size #{$others};
  }

  [data-dpr="3"] & {
    #{$property}: $size * 1.5 #{$others};
  }
}

.mu-paper{
    width: 100%;
    position: fixed;
    bottom: 0;
}
</style>