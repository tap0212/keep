/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const gray = '#606368';
const off1 = '#F0F0F0';
const off2 = '#d8d8d8';
const off3 = '#6c757d';
const backDrop = '#202124';
const accentDefault = '#F5ECFF';
const accent = '#8500ff';
const textDark = '#000000';
const textLight = '#d8d8d8';
const primaryLight = '#F0F0F0';
const primaryDark = '#18191A';
const secondaryLight = '#FFFFFF';
const secondaryDark = '#242526';
const colors = {
  // Example colors:
  off1,
  off2,
  off3,
  gray,
  backDrop,
  accent,
  accentDefault,
  theme: {
    lightMode: {
      text: textDark,
      primary: primaryLight,
      secondary: secondaryLight
    },
    darkMode: {
      text: textLight,
      primary: primaryDark,
      secondary: secondaryDark
    }
  }
};
module.exports = colors;
