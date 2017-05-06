<template>
  <div class="index">
      <mu-list>
        <mu-list-item v-for="listdata in listdatas" :title="listdata.title">
          <mu-avatar :src="listdata.author.avatar_url" slot="leftAvatar" />
        </mu-list-item>
      </mu-list>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      listdatas: ''
    }
  }, mounted() {
    this.getIndexData()
  }, methods: {
    getIndexData() {
      this.$http.get("https://cnodejs.org/api/v1/topics", { params: { page: 1, limit: 20 } }).then(e => {
        console.info(e.body);
        this.listdatas = e.body.data;
      }, e => {

      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
