# meu-portfólio

  <!-- useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const animateElement = (selector: string, trigger: string, config: object) => {
        gsap.fromTo(
          selector,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger,
              scrub: true,
              ...config,
            },
          }
        );
      };

      const defaultScrollConfig = {
        start: "top 770px",
        end: "bottom 900px",
      };

      animateElement(".title", ".box-02", defaultScrollConfig);
      animateElement(".text", ".box-02", { ...defaultScrollConfig, start: "top 750px" });
      animateElement(".button", ".box-02", { ...defaultScrollConfig, start: "top 730px" });
    });

    return () => context.revert();
  }, []); -->
