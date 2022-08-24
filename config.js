import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig()

export const API_KEY = publicRuntimeConfig.REACT_APP_KEY;