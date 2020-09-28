const getters = {
  telephone:state => state.user.telephone,
  token:state => state.user.token,
  name:state => state.user.name,
  avatar:state => state.user.avatar,
  role:state => state.user.role,
  UUid:state => state.user.UUid,
  curThemeType: state => state.theme.curThemeType,
}
export default getters