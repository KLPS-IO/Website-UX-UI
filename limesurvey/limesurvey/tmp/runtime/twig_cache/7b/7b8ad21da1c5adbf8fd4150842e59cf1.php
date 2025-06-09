<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\CoreExtension;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* __string_template__824025bcbc07bd8a7bbcc2294ae08468 */
class __TwigTemplate_bfd067adbd2c67097621d6022e96d670 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->extensions[SandboxExtension::class];
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 6
        yield "
<!-- quickaddModal -->
<div class=\"modal fade labelsets-update\" id=\"quickaddModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"quickaddModal\">
    <div class=\"modal-dialog modal-lg\" role=\"document\">
        <div class=\"modal-content\">
            <div class=\"modal-header\">
                <h5 class=\"modal-title\">";
        // line 12
        yield gT("Quick-add labels");
        yield "</h5>
                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
            </div>

            <div class=\"modal-body\">
                <p>
                    ";
        // line 18
        yield gT("Enter one label per line. You can provide a code by separating code and label text with a semicolon or tab. For multilingual surveys you add the translation(s) on the same line separated with a semicolon or tab. Please remember to use the save button after applying the changes.");
        yield "
                </p>
                <textarea id='quickaddarea' class='tipme form-control' title='' cols='100' rows='10'></textarea>
            </div>
            <div class=\"modal-footer\">
                <button class='btn btn-cancel' id='btnqacancel' type='button'  data-bs-dismiss=\"modal\">";
        // line 23
        yield gT("Cancel");
        yield "</button>
                <button class='btn btn-outline-secondary' id='btnqareplace' type='button'>
                    ";
        // line 25
        yield gT("Replace");
        yield "
                </button>
                <button class='btn btn-primary' id='btnqainsert' type='button'>
                    ";
        // line 28
        yield gT("Add");
        yield "
                </button>
            </div>
        </div>
    </div>
</div>

<!--labelset browser Modal -->
<div class=\"modal fade labelsets-update\" id=\"labelsetbrowserModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"labelsetbrowserModal\">
    <div class=\"modal-dialog modal-lg\" role=\"document\">
        <div class=\"modal-content\">
            <div class=\"modal-header\">
                <h5 class=\"modal-title\">";
        // line 40
        yield gT("Manage label sets");
        yield "</h5>
                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
            </div>

            <div class=\"modal-body\">
                <div class=\"container-fluid\">
                    <div class=\"row\" id=\"labelsetsLoader\">
                        <div class=\"ls-flex ls-flex-column align-items-center align-content-center\" style=\"height: 200px;\">
                            <div class=\"loader--loaderWidget ls-flex ls-flex-column align-content-center align-items-center\" style=\"min-height: 100%;\">
                                <div class=\"ls-flex align-content-center align-items-center\">
                                <div class=\"loader-adminpanel text-center\">
                                    <div class=\"contain-pulse animate-pulse\">
                                        <div class=\"square\"></div>
                                        <div class=\"square\"></div>
                                        <div class=\"square\"></div>
                                        <div class=\"square\"></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id=\"labelsetsModalContent\" style=\"display: none;\">
                        <div class=\"row\" id=\"labelsetsSelectorContainer\">
                            <div class=\"col-12\">
                                <label for=\"labelsets\">";
        // line 65
        yield gT("Label sets list");
        yield "</label>
                            </div>
                            <div class=\"col-12\">
                                <select id='labelsets' size='10' style='width:250px;'>
                                    <option>--";
        // line 69
        yield gT("Label sets");
        yield "--</option>
                                </select>
                            </div>
                        </div>
                        <div class=\"row\">
                            <div id=\"labelsetalert\" class=\"col-12\" style=\"display: none;\"></div>
                            <div id='labelsetpreview' class=\"col-12 ls-space margin top-15\" >
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class=\"modal-footer\">
                <button class='btn btn-cancel' id='btnqacancel' type='button'  data-bs-dismiss=\"modal\">";
        // line 83
        yield gT("Cancel");
        yield "</button>
                <button id='btnlsreplace' type='button' class='btn btn-outline-secondary'>
                    ";
        // line 85
        yield gT("Replace");
        yield "
                </button>
                <button id='btnlsinsert'  type='button' class='btn btn-primary'>
                    ";
        // line 88
        yield gT("Add");
        yield "
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Save as labelset Modal -->
<div class=\"modal fade\" id=\"saveaslabelModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"saveaslabelModal\">
    <div class=\"modal-dialog\" role=\"document\">
        <div class=\"modal-content\">
            <div class=\"modal-header\">
                <h5 class=\"modal-title\">";
        // line 100
        yield gT("Save as label set");
        yield "</h5>
                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
            </div>

            <div class=\"modal-body\">
                <div class=\"btn-group mb-3\">
                    <input class=\"btn-check\" type=\"radio\" name=\"savelabeloption\" id=\"newlabel\">
                    <label class=\"btn btn-outline-secondary\" for=\"newlabel\">";
        // line 107
        yield gT("New label set");
        yield "</label>
                    <input class=\"btn-check\" type=\"radio\" name=\"savelabeloption\" id=\"replacelabel\">
                    <label class=\"btn btn-outline-secondary\" for=\"replacelabel\">";
        // line 109
        yield gT("Replace the existing record.");
        yield "
                </div>
            </div>

            <div class=\"modal-footer\">
                <button class='btn btn-cancel' id='btnlacancel' type='button'  data-bs-dismiss=\"modal\">";
        // line 114
        yield gT("Cancel");
        yield "</button>
                <button id='btnsavelabelset' class='btn btn-primary' type='button'>
                    ";
        // line 116
        yield gT("Save");
        yield "
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Confirm labelset replacement -->
<div class=\"modal fade\" id=\"dialog-confirm-replaceModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"dialog-confirm-replaceModal\">
    <div class=\"modal-dialog\" role=\"document\">
        <div class=\"modal-content\">
            <div class=\"modal-header\">
                <h5 class=\"modal-title\">";
        // line 128
        yield gT("Replace label set?");
        yield "</h5>
                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
            </div>

            <div class=\"modal-body\">
                <p>
                    <span id='strReplaceMessage'></span>
                </p>
            </div>

            <div class=\"modal-footer\">
                <button class='btn btn-outline-secondary' id='btnlconfirmreplace' type='button' data-bs-dismiss=\"modal\">";
        // line 139
        yield gT("OK");
        yield "</button>
                <button class='btn btn-cancel'           id='btnlacancel'        type='button' data-bs-dismiss=\"modal\">";
        // line 140
        yield gT("Cancel");
        yield "</button>
            </div>
        </div>
    </div>
</div>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "__string_template__824025bcbc07bd8a7bbcc2294ae08468";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  230 => 140,  226 => 139,  212 => 128,  197 => 116,  192 => 114,  184 => 109,  179 => 107,  169 => 100,  154 => 88,  148 => 85,  143 => 83,  126 => 69,  119 => 65,  91 => 40,  76 => 28,  70 => 25,  65 => 23,  57 => 18,  48 => 12,  40 => 6,);
    }

    public function getSourceContext()
    {
        return new Source("", "__string_template__824025bcbc07bd8a7bbcc2294ae08468", "");
    }
    
    public function checkSecurity()
    {
        static $tags = array();
        static $filters = array();
        static $functions = array("gT" => 12);

        try {
            $this->sandbox->checkSecurity(
                [],
                [],
                ['gT'],
                $this->source
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
