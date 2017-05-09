export default {
  feedContainer: {
    marginTop: '24px',
    height: '100%',
    width: '992px',
  },
  feedSearchContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    maxHeight: '88px',
  },
  feedScrollContainer: {
    // The viewport minus the app bar height and search bar height above
    height: 'calc(100vh - 64px - 88px - 32px)',
    marginTop: '16px',
    width: '992px',
  },
  feedScroll: {
    outline: 'none',
  },
  feedView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};
