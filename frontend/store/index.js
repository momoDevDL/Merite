import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

export const state = () => ({
    token: "",
    loading: "",
    firstConnexion: true,
    courses: [],
    currentCourse: {
        course: {
            name: "default",
            id: 0
        },
        favorite: false,
        sections: []
    }
});

export const mutations = {
    // incrémentation du compteur d'une valeur [inc]
    setToken(state, token) {
        state.token = token;
    },
    deleteToken(state) {
        state.token = "";
    },
    setLoading(state, value) {
        state.loading = value;
    },
    changeFirstConnexion(state) {
        state.firstConnexion = false;
    },
    setCourses(state, courses) {
        state.courses = [...courses];
        state.currentCourse = courses[0]
    },
    toggleFavoriteCourse(state, courseParam) {
        let newCourses = [];
        state.courses.forEach(course => {
            if (course.course.id == courseParam.course.id) {
                let newCourse = {
                    ...course,
                    favorite: !course.favorite
                };
                newCourses.push(newCourse);
            } else {
                newCourses.push(course);
            }
        });
        state.courses = [...newCourses];
    },
    setCurrentCourse(state, cl) {
        state.currentCourse = cl;
    }
};