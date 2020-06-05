<?php

defined('TYPO3_MODE') || die();

/*
 * ###########################
 * Add  Context Sensitive Help (CSH)
 * ===========================
 */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr(
    'tt_content',
    'EXT:t3kit/Resources/Private/Language/ContentElements/locallang_csh_ttc.xlf'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr(
    'sys_file_reference',
    'EXT:t3kit/Resources/Private/Language/ContentElements/locallang_csh_sfr.xlf'
);


/*
 * ###########################
 * Load additional t3kit stylesheets to skin the Backend
 * ===========================
 */
$GLOBALS['TBE_STYLES']['skins'][$_EXTKEY]['stylesheetDirectories'][] = 'EXT:t3kit/Resources/Public/CSS/BE/';
