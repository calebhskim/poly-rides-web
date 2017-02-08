export function loadPosts(userId) {
  return {
    types: ['LOAD_FB_GROUPS_START', 'LOAD_FB_GROUPS_SUCCESS', 'LOAD_FB_GROUPS_FAILURE'],
    shouldCallAPI: (state) => !state.auth.user.isGroup,
    callAPI: () => { console.log('hellooo') },
  }
}
