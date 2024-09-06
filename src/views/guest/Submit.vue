<script></script>

<template>
  <div class="mt-[112px]">
    <h1 class="text-2xl font-bold text-center mt-14">Form Pengiriman Karya</h1>
    <div class="w-fit mt-10 mx-auto px-5">
      <form action="" method="post">
        <label for="" class="text-xs block">Nama</label>
        <input
          type="text"
          name=""
          id=""
          class="w-full max-w-[1036px] border border-red rounded-xl"
        />
        <label for="" class="text-xs block mt-5">Judul</label>
        <input type="text" name="" id="" class="w-full max-w-[1036px] rounded-xl" />
        <label for="" class="text-xs block mt-5">Gambar</label>
        <input
          ref="fileInput"
          type="file"
          class="w-full max-w-[1036px] border border-black rounded-xl"
        />
        <div class="w-[346px] block bg-cover bg-center border h-[164px] mt-5"></div>

        <label for="" class="text-xs block mt-5">Deskripsi</label>
        <textarea
          name=""
          id=""
          class="w-full md:w-[1036px] h-[250px] md:h-[476px] rounded-xl"
        ></textarea>
        <div class="w-full flex justify-end">
          <button
            class="bg-[#103968] flex justify-center gap-2 items-center p-2 px-20 rounded-[10px] mt-5"
          >
            <img
              src="@/assets/image/plane-paper.png"
              class="w-4 h-4 md:w-8 md:h-8"
              alt="plane-paper.png"
            />
            <p class="text-white font-medium">Kirim</p>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
