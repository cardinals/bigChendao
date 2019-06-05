<template>
    <a-locale-provider :locale="locale">
        <slot></slot>
    </a-locale-provider>
</template>

<script>
import { LocaleProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
    name: "newLocaleProvider",
    components: { ALocaleProvider: LocaleProvider },
    data() {
        return {
            locale: zhCN
        };
    }
};
</script>

<style scoped></style>
