<script setup>
import { MoveLeft } from "lucide-vue-next";
import { IftaLabel } from "primevue";
import { InputText } from "primevue";

</script>

<template>
  <form class="container-form">
    <MoveLeft />
    <h2>Enter cell phone number</h2>
    <p>You must enter your cell phone number to continue.</p>

    <div class="contain-input">
      <div class="state-location">
          prefijo<br />
          +51
      </div>
     <div class="input-number">
       <input type="text" id="input-number" placeholder="Enter the number"></input>
     </div>
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
  align-items: center;
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

.state-location {
  background-color: rgb(220, 218, 218);
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
}

</style>
