import React from "react";

const Trusted = () => {
  return (
    <div>
      <section class="mb-32 text-center">
        <h2 class="mb-16 text-3xl font-bold">
          Trusted by <u class="">2,000,000+</u> users
        </h2>

        <div class="grid items-center gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div class="mb-12 lg:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/2.png"
              class="px-6  md:px-12"
              alt="Nasa - logo"
            />
          </div>

          <div class="mb-12 lg:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/1.png"
              class="px-6  md:px-12"
              alt="Amazon - logo"
            />
          </div>

          <div class="mb-12 lg:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/3.png"
              class="px-6  md:px-12"
              alt="Nike - logo"
            />
          </div>

          <div class="mb-12 lg:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/landing-page/4.png"
              class="px-6  md:px-12"
              alt="Ikea - logo"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trusted;
