const NiceScroll = () => {
  return {
    restrict: "A",
    link: (scope, element, attrs) => {
      setNiceScroll();
      refreshNiceScrollForDynamicContent();

      function setNiceScroll() {
        $("." + attrs.class).niceScroll();
      }
      function refreshNiceScrollForDynamicContent() {
        scope.$on("refreshNicescroll", () => {
          $("." + attrs.class)
            .getNiceScroll()
            .remove();
          $("." + attrs.class).niceScroll();
        });
      }
    }
  };
};

export default NiceScroll;
