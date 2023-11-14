export default [
  {
    displaySlots() {
      window.googletag = window.googletag || { cmd: [] };
      // const closableAdSlots = this.config.slots.filter((e) =>
      //   e.hasOwn('closeable')
      // )

      this.config.slots.forEach((item) => {
        // let GAMSlot = this.slots[item.id]
        let element = document.getElementById(item.id);
        document.addEventListener(
          "click",
          function (event) {
            if (!event.target.matches("#" + item.id)) return;
            event.preventDefault();

            element.style.minHeight = 0;
            element.style.height = 0;
            element.style.opacity = 0;

            setInterval(function () {
              element.remove();
            }, 1000);

            // Destroy the GAM slot
            window.googletag.cmd.push(function () {
              // window.googletag.destroySlots([GAMSlot]);
            });
          },
          false,
        );
      });
    },
  },
];
