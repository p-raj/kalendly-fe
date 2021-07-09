const updateWindowDimensions = (updateStateFunction) => {
    updateStateFunction(window.innerWidth < 768);
};

export default updateWindowDimensions;
