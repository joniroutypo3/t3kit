<?php
defined('TYPO3_MODE') || die();

/*
 * ###########################
 * Add Content Element to Type list
 * ===========================
 */


/*
 * ###########################
 * Add icon for Content Element
 * ===========================
 */


/*
 * ###########################
 * Configure element fields (types) to display
 * ===========================
 */
$GLOBALS['TCA']['tt_content']['types']['header']  = array_replace_recursive(
    $GLOBALS['TCA']['tt_content']['types']['header'],
    [
        'columnsOverrides' => [
            'header_link' => [
                'config' => [
                    'fieldControl' => [
                        'linkPopup' => [
                            'options' => [
                                'blindLinkFields' => 'params, target, class',
                                'blindLinkOptions' => 'folder, mail, telephone'
                            ]
                        ]
                    ]
                ]
            ]
        ]
    ]
);


/*
* ###########################
* Add columns for Content Element
* ===========================
*/


/*
 * ###########################
 * Add new palettes for a Content Element
 * ===========================
 */


/*
 * ###########################
 * Add flexForms for Content Element
 * ===========================
 */
