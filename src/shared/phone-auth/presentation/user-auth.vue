<script setup>
import { MoveLeft } from "lucide-vue-next";
import { FloatLabel } from "primevue";
import {InputText} from "primevue"

</script>

<template>
  <form class="container-form">
    <MoveLeft />
    <h2>Enter your details</h2>
    <p>You need to enter your details so we can identify you to continue.</p>

    <div class="contain-input">
        <label for="Names" class="label-initial">Names</label>
      <FloatLabel variant="in">
        <InputText id="Names" v-model="value2" variant="filled" style="width: 100%;"/>
            <label for="Names">Names</label>
    </FloatLabel>
    </div>
    <div class="contain-input">
        <label for="Names" class="label-initial">Last Names</label>
     <FloatLabel variant="in">
        <InputText id="lastNames" v-model="value2" variant="filled" style="width: 100%;"/>
            <label for="lastNames">Last Names</label>
    </FloatLabel>
    </div>
    <p>By continuing, you agree to AuraNeuro's Privacy Policy and Terms of Use.</p>
  <button type="submit" class="button-siguiente">Next</button>

  </form>
</template>

<style scoped>
.container-form {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 25rem;
  gap: 1rem;
  margin-top: 5rem;
  padding: 0.5rem;
}

.contain-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.input-number {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.input-number input{
  height: 3rem;
  border-radius: 0.5rem;
}

.button-siguiente {
  background-color: #7145D8;
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.label-initial {
    padding: 1rem;
    background-color: rgb(174, 173, 173);
    border-radius: 0.5rem;
    width: 40%;
}

</style>
