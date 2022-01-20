import Vue, { VNode } from "vue";
import { Component } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import dayjs from "dayjs";

export interface Page extends Vue {
  title: string | VNode | any;
  htmlTitle?: string;
  setLang: () => void;
  setPageConfig: () => void;
}

@Component({
  head() {
    const vm = this as Page;
    return {
      title: vm.htmlTitle || vm.title,
      meta: [
        {
          hid: "theme-color",
          name: "theme-color",
          content:
            vm.$store.state.app.appbar.color ||
            (vm.$store.state.app.dark ? "#000000" : "#FFFFFF"),
        },
      ],
    };
  },
  beforeRouteEnter(_to, _from, next) {
    next((vm: any) => {
      vm.setLang();
      vm.setPageConfig();
    });
  },
})
export default class PageView extends Vue {
  @Mutation("app/SET_APPBAR") setAppbar;

  get appbar() {
    return {};
  }

  get bottomNav() {
    return "";
  }

  get sidebarNav() {
    return "";
  }

  setLang() {
    const locale = this.$utils.helper.getLocale();
    this.$i18n.locale = locale;
    // this.$vuetify.lang.current = locale;
    dayjs.locale(locale);
  }

  setPageConfig() {
    const freshworkLauncher: any = document.querySelector("#launcher-frame");
    if (freshworkLauncher) {
      if (this.$route.name !== "index") {
        freshworkLauncher.style.display = "none";
      } else {
        freshworkLauncher.style.display = "block";
      }
    }
    // if (this.bottomNav) {
    //   this.$store.commit("app/SET_BOTTOM_NAV", this.bottomNav);
    // } else {
    //   this.$store.commit("app/SET_BOTTOM_NAV", null);
    // }

    this.setAppbar({ title: (this as any).title, ...this.appbar });
    setTimeout(() => {
      this.$utils.helper.loadMixinTheme();
    }, 100);
  }
}
