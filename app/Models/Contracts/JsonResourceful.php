<?php

namespace App\Models\Contracts;

interface JsonResourceful
{
    /**
     * @return string
     */
    function getResourceType();

    /**
     * @return array
     */
    function prepareData();

    /**
     * @return array
     */
    function prepareIncluded();

    /**
     * @return array
     */
    function prepareLinks();

    /**
     * @return array
     */
    function prepareAttributes();

    /**
     * @return array
     */
    function asJsonResource();

    /**
     * @return array
     */
    function asJsonResourceWithRelationships();
}
