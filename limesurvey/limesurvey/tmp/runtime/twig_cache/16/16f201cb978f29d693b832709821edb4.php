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

/* __string_template__b6f2656e5ca97b01bf428bb5f352b510 */
class __TwigTemplate_b1bc4c67749ea692b04f082f9efb72c2 extends Template
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
        // line 1
        yield "<!-- Survey's texts -->
<div class=\"card card-primary h-100\">
    <!-- Default panel contents -->
    <div class=\"card-header\">
        <h5 class=\"card-title\">";
        // line 5
        yield gT("Text elements");
        yield "</h5>
        <a class=\"float-end btn btn-outline-secondary btn-xs pjax\" data-bs-toggle=\"tooltip\" title=\"";
        // line 6
        yield gT("Survey text elements");
        yield "\" href=\"";
        yield LS_Twig_Extension::createUrl("surveyAdministration/rendersidemenulink", ["subaction" => "surveytexts", "surveyid" => $this->sandbox->ensureToStringAllowed(($context["surveyid"] ?? null), 6, $this->source)]);
        yield "\">
          <i class=\"ri-tools-line\"></i>
        </a>
    </div>
    <!-- List group -->
    <ul class=\"list-group list-group-flush\">
            <!-- Description -->
        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
                <div class=\"col-4 card-label\">
                    ";
        // line 16
        yield gT("Description:");
        yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                        ";
        // line 19
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["surveyTextContent"] ?? null), "surveyls_description", [], "any", false, false, true, 19) != "")) {
            // line 20
            yield "                            ";
            yield LS_Twig_Extension::getTextDisplayWidget($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["surveyTextContent"] ?? null), "surveyls_description", [], "any", false, false, true, 20), 20, $this->source), "description_text");
            yield "
                        ";
        }
        // line 22
        yield "                </div>
            </div>
        </li>
        <!-- Welcome -->
        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
                <div class=\"col-4 card-label\">
                    ";
        // line 29
        yield gT("Welcome:");
        yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                        ";
        // line 32
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["surveyTextContent"] ?? null), "surveyls_welcometext", [], "any", false, false, true, 32) != "")) {
            // line 33
            yield "                            ";
            yield LS_Twig_Extension::getTextDisplayWidget($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["surveyTextContent"] ?? null), "surveyls_welcometext", [], "any", false, false, true, 33), 33, $this->source), "welcome_text");
            yield "
                        ";
        }
        // line 35
        yield "                </div>
            </div>
        </li>

        <!-- End message -->
        <li class=\"list-group-item p-0 border-0\">
            <div class=\"ls-flex-row col-12\">
                <div class=\"col-4 card-label\">
                    ";
        // line 43
        yield gT("End message:");
        yield "
                </div>
                <div class=\"col-8 ls-card-grid__description\">
                    ";
        // line 46
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["surveyTextContent"] ?? null), "surveyls_endtext", [], "any", false, false, true, 46) != "")) {
            // line 47
            yield "                        ";
            yield LS_Twig_Extension::getTextDisplayWidget($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["surveyTextContent"] ?? null), "surveyls_endtext", [], "any", false, false, true, 47), 47, $this->source), "end_text");
            yield "
                    ";
        }
        // line 49
        yield "                </div>
            </div>
        </li>
        ";
        // line 52
        if ((CoreExtension::getAttribute($this->env, $this->source, ($context["oSurvey"] ?? null), "showsurveypolicynotice", [], "any", false, false, true, 52) > 0)) {
            // line 53
            yield "                    <!-- Data security notice -->
                    <li class=\"list-group-item p-0 border-0\">
                        <div class=\"ls-flex-row col-12\">
                            <div class=\"col-4 card-label\">
                                 ";
            // line 57
            yield gT("Privacy policy text:");
            yield "
                            </div>
                            <div class=\"col-8 ls-card-grid__description\">
                                ";
            // line 60
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["surveyTextContent"] ?? null), "surveyls_policy_notice", [], "any", false, false, true, 60) != "")) {
                // line 61
                yield "                                    ";
                yield LS_Twig_Extension::getTextDisplayWidget($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["surveyTextContent"] ?? null), "surveyls_policy_notice", [], "any", false, false, true, 61), 61, $this->source), "security_notice");
                yield "
                                ";
            }
            // line 63
            yield "                            </div>
                        </div>
                    </li>
                    <!-- Data security notice error -->
                    <li class=\"list-group-item p-0 border-0\">
                        <div class=\"ls-flex-row col-12\">
                            <div class=\"col-4 card-label\">
                                ";
            // line 70
            yield gT("Privacy policy error text:");
            yield "
                            </div>
                            <div class=\"col-8 ls-card-grid__description\">
                                ";
            // line 73
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["surveyTextContent"] ?? null), "surveyls_policy_error", [], "any", false, false, true, 73) != "")) {
                // line 74
                yield "                                    ";
                yield LS_Twig_Extension::getTextDisplayWidget($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["surveyTextContent"] ?? null), "surveyls_policy_error", [], "any", false, false, true, 74), 74, $this->source), "security_error");
                yield "
                                ";
            }
            // line 76
            yield "                            </div>
                        </div>
                    </li>
                    <!-- Data security notice label -->
                    <li class=\"list-group-item p-0 border-0\">
                        <div class=\"ls-flex-row col-12\">
                            <div class=\"col-4 card-label\">
                                ";
            // line 83
            yield gT("Privacy policy label text:");
            yield "
                            </div>
                            <div class=\"col-8 ls-card-grid__description\">
                                ";
            // line 86
            if ((CoreExtension::getAttribute($this->env, $this->source, ($context["surveyTextContent"] ?? null), "surveyls_policy_notice_label", [], "any", false, false, true, 86) != "")) {
                // line 87
                yield "                                    ";
                yield LS_Twig_Extension::getExpressionManagerOutput($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["surveyTextContent"] ?? null), "surveyls_policy_notice_label", [], "any", false, false, true, 87), 87, $this->source));
                yield "
                                ";
            }
            // line 89
            yield "                            </div>
                        </div>
                    </li>
            ";
        }
        // line 93
        yield "    </ul>
</div>
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "__string_template__b6f2656e5ca97b01bf428bb5f352b510";
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
        return array (  205 => 93,  199 => 89,  193 => 87,  191 => 86,  185 => 83,  176 => 76,  170 => 74,  168 => 73,  162 => 70,  153 => 63,  147 => 61,  145 => 60,  139 => 57,  133 => 53,  131 => 52,  126 => 49,  120 => 47,  118 => 46,  112 => 43,  102 => 35,  96 => 33,  94 => 32,  88 => 29,  79 => 22,  73 => 20,  71 => 19,  65 => 16,  50 => 6,  46 => 5,  40 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "__string_template__b6f2656e5ca97b01bf428bb5f352b510", "");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 19);
        static $filters = array();
        static $functions = array("gT" => 5, "createUrl" => 6, "getTextDisplayWidget" => 20, "getExpressionManagerOutput" => 87);

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                [],
                ['gT', 'createUrl', 'getTextDisplayWidget', 'getExpressionManagerOutput'],
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
