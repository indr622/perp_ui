export default {
    methods: {
        $can(permissionName) {
            let Permission = this.$store.state.auth.user.permission
            if (typeof Permission != 'undefined') {
                return Permission.indexOf(permissionName) !== -1;
            }
        },
    },
};