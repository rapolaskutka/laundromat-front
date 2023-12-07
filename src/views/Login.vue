<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import settings from "../settings.json";
import Button from "../components/Button.vue";

const router = useRouter();

const urlApi = `${settings.environments.prod.api.uri}/auth`;
const user = ref([]);
const email = ref(null);
const password = ref(null);
const message = ref(null);

function auth(data) {
  const body = JSON.stringify({'email': data.email, 'password': data.password});
  axios
      .post(urlApi, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        user.value = response.data;
        localStorage.setItem('refresh', response.data.refresh_token);
        localStorage.setItem('token', response.data.token);
        // localStorage.setItem('expiration', response.data.refresh_token_expiration);
        router.push('/');
      })
      .catch(error => {
        console.log(error);
        if (error.response.status == 401) {
          message.value = error.response.data.message;
        }
      });
}

</script>

<template>
  <div class="main">
    <svg xmlns="http://www.w3.org/2000/svg" width="71" height="79" viewBox="0 0 71 79" fill="none">
      <g clip-path="url(#clip0_2_413)">
        <path
            d="M26.2691 66.5029C26.2691 65.5415 25.6458 64.6798 24.1589 64.6798C22.9122 64.6798 22.153 65.4795 21.8725 66.5029L22.9844 66.8682C23.1406 66.2194 23.5355 65.8659 24.0346 65.8659C24.5958 65.8659 24.8345 66.1282 24.8345 66.575C24.8345 67.8721 21.9968 68.6514 21.9143 70.7902L21.9343 71.3981H26.2792V70.2529H23.5153C23.8784 68.8955 26.2691 68.7629 26.2691 66.5029ZM21.2028 66.5029C21.2028 65.5415 20.5797 64.6798 19.093 64.6798C17.8457 64.6798 17.0862 65.4795 16.8057 66.5029L17.9183 66.8682C18.0745 66.2194 18.4691 65.8659 18.9684 65.8659C19.5296 65.8659 19.7681 66.1282 19.7681 66.575C19.7681 67.8721 16.9301 68.6514 16.8477 70.7902L16.8682 71.3981H21.2131V70.2529H18.4489C18.8123 68.8955 21.2028 68.7629 21.2028 66.5029ZM13.8715 65.8659C14.4329 65.8659 14.6934 66.1182 14.6934 66.7061V67.2642C14.6714 67.6491 14.2146 67.7799 13.8297 67.7799C13.3105 67.7799 13.0402 67.5676 13.0402 66.8385C13.0402 66.1591 13.2992 65.8659 13.8715 65.8659ZM13.5592 68.8858C14.0276 68.8858 14.401 68.7728 14.6934 68.5502V69.3211C14.6934 69.9895 14.3811 70.3236 13.7153 70.3236C13.1747 70.3236 12.8522 70.1107 12.6234 69.5437L11.6992 70.0601C12.0203 70.9919 12.7279 71.4896 13.7979 71.4896C15.2228 71.4896 16.0962 70.6182 16.0962 69.2296V66.7767C16.0962 65.6121 15.3473 64.6701 13.8922 64.6701C12.4267 64.6701 11.6151 65.4795 11.6151 66.8891C11.6151 68.2569 12.3744 68.8858 13.5592 68.8858ZM9.16119 71.3981H10.6577V64.7309H9.47215C9.34758 65.743 9.15105 65.9359 8.37029 65.9359H7.79876V66.9287H9.16119V71.3981ZM48.5044 54.2411C50.5 54.2411 52.1455 53.5923 53.4067 52.2957L53.5815 53.9346H57.0483V36.5944H53.1618V49.5651C52.4967 50.4525 51.3055 51.2041 49.765 51.2041C47.7689 51.2041 46.7878 50.0098 46.7878 47.7222V36.5944H42.867V47.6876C42.867 51.715 44.8969 54.2411 48.5044 54.2411ZM32.1911 48.814C32.1911 52.2957 33.5559 54.2081 36.918 54.2081C38.2137 54.2081 39.2632 53.8996 40.1737 53.4219L39.8244 51.0668C39.3329 51.2372 38.8431 51.34 38.3185 51.34C36.9879 51.34 36.1474 50.6236 36.1474 48.9845V40.1439H40.1737V37.2775H36.1474V33.3181H33.4163L32.401 37.1748L30.0542 37.3456V39.7691L32.1911 40.3147V48.814ZM17.8042 48.9167L20.0797 46.5279L24.7369 53.9346H29.1491L22.6706 44.1043L28.5889 36.5944H24.3518L17.8042 45.06V31.6114H13.8819V53.9346H17.8042V48.9167ZM67.099 75.1979H3.90085V3.80314H67.099V75.1979ZM0 0.000968933V79H70.9995V0.000968933H0Z"
            fill="#231F20"/>
      </g>
      <defs>
        <clipPath id="clip0_2_413">
          <rect width="71" height="79" fill="white"/>
        </clipPath>
      </defs>
    </svg>
    <Transition name="fade">
      <div v-if="message" class="error-message">
        {{ message }}
      </div>
    </Transition>
    <form v-on:submit.prevent="auth({email, password})">
      <input type="text" placeholder="Username (email)" required v-model="email">
      <input type="password" placeholder="password" required v-model="password">
      <Button>Login</Button>
    </form>
  </div>
</template>

<style scoped>
div.main {
  position: relative;
  top: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

svg {
  margin-bottom: 10vh;
}
</style>
