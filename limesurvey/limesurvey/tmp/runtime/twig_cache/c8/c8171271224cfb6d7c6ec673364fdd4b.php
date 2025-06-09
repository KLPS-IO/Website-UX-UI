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

/* ./subviews/navigation/navigator_complement.twig */
class __TwigTemplate_f561b8b116b36e1322c18833b50203b1 extends Template
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
        if (((((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aNavigator", [], "any", false, false, true, 6), "load", [], "any", false, false, true, 6), "show", [], "any", false, false, true, 6) == "Y") || (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aNavigator", [], "any", false, false, true, 6), "save", [], "any", false, false, true, 6), "show", [], "any", false, false, true, 6) == "Y")) || (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aQuestionIndex", [], "any", false, false, true, 6), "bShow", [], "any", false, false, true, 6) == true)) || (CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "bShowClearAll", [], "any", false, false, true, 6) == true))) {
            // line 7
            yield "    <!-- extra tools, can be shown with javascript too (just remove ls-js-hidden class -->
    <div class=\"row ls-js-hidden\">
        <!-- Extra button container -->
        <div class=\"col-md-6 clearall-saveall-wrapper d-flex justify-content-start\">
            ";
            // line 11
            if (((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aNavigator", [], "any", false, false, true, 11), "load", [], "any", false, false, true, 11), "show", [], "any", false, false, true, 11) == "Y") || (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aNavigator", [], "any", false, false, true, 11), "save", [], "any", false, false, true, 11), "show", [], "any", false, false, true, 11) == "Y"))) {
                // line 12
                yield "                ";
                yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/save_buttons.twig");
                yield "
            ";
            }
            // line 14
            yield "            ";
            if (((CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "bShowClearAll", [], "any", false, false, true, 14) == true) || (CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "bShowClearAll", [], "any", false, false, true, 14) == null))) {
                // line 15
                yield "                ";
                yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/clearall_buttons.twig");
                yield "
            ";
            }
            // line 17
            yield "        </div>
         <!-- Index container -->
        ";
            // line 19
            if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aQuestionIndex", [], "any", false, false, true, 19), "bShow", [], "any", false, false, true, 19) == true)) {
                // line 20
                yield "            ";
                yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/question_index_buttons.twig");
                yield "
        ";
            }
            // line 22
            yield "    </div>
";
        }
        // line 24
        yield "
";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/navigation/navigator_complement.twig";
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
        return array (  81 => 24,  77 => 22,  71 => 20,  69 => 19,  65 => 17,  59 => 15,  56 => 14,  50 => 12,  48 => 11,  42 => 7,  40 => 6,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/navigation/navigator_complement.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/navigation/navigator_complement.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 6);
        static $filters = array();
        static $functions = array("include" => 12);

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                [],
                ['include'],
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
