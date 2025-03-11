<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <div class="flex justify-center text-3xl pb-5">MSWJS + Vue Demo</div>
      <div class="flex flex-col gap-2">
        <div class="flex">
          <span class="flex items-center gap-x-2">
            <label>Simple Backend Consume</label>
            <button @click="test" class="p-1 rounded-md border border-blue-500 hover:bg-blue-300">Hit Backend</button>
          </span>
        </div>
        <div class="flex gap-2">
          <span class="flex items-center gap-x-2">Simple Paging</span>
          <button @click="nextOrPrevPage(false)" class="p-1 rounded-md border border-blue-500 hover:bg-blue-300">Prev Page</button>
          <button @click="nextOrPrevPage(true)" class="p-1 rounded-md border border-blue-500 hover:bg-blue-300">Next Page</button>
        </div>
      </div>

      <div>
        <span>result : </span><pre>{{ data }}</pre>
      </div>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

<!--  <RouterView />-->
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useFetch } from '@/composable/useFetch.ts'
import { ref } from 'vue'

const page = ref(0);
const { data, fetchRequest } = useFetch();

const test = () => {
  fetchRequest('http://localhost/user/list', {
    method: 'POST',
    body: JSON.stringify({
      "requestType": "LIST",
      "size": 15,
      "page": 1,
      "sortBy": {
        "code": "ASC",
        "name": "DESC"
      },
      "filterBy": {}
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'flowId': `application Name + user Name + ${new Date().toISOString().replace(/[\D]/g, '').slice(0, 17)}`
    }
  });
}

const nextOrPrevPage = (isNextPage: boolean) => {
  fetchRequest('http://localhost/user/list', {
    method: 'POST',
    body: JSON.stringify({
      "requestType": "LIST",
      "size": 15,
      "page": isNextPage ? page.value += 1 : page.value -= 1,
      "sortBy": {
        "code": "ASC",
        "name": "DESC"
      },
      "filterBy": {
        "name": ["LINA","SONNY"],
        "email": ["BHAKTI","GMAIL"],
        "active": true,
        "deleted": false
      }
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'flowId': `application Name + user Name + ${new Date().toISOString().replace(/[\D]/g, '').slice(0, 17)}`
    }
  });
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
