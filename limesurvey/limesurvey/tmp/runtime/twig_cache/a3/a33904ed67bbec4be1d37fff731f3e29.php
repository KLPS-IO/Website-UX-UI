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

/* ./subviews/header/nav_bar.twig */
class __TwigTemplate_8bb8fb1b04f8c2ef205d05945dd19b65 extends Template
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
        // line 19
        if ( !CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "popupPreview", [], "any", false, false, true, 19)) {
            // line 20
            yield "    <!-- Bootstrap Navigation Bar -->
    <div id=\"survey-nav\" class=\"navbar fixed-top\">
        <div class=\"container-fluid col-xl-8\">
            ";
            // line 23
            if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 23), "brandlogo", [], "any", false, false, true, 23) == "on")) {
                // line 24
                yield "                <div class=\"navbar-brand logo-container d-none d-md-block\">
                    ";
                // line 25
                yield LS_Twig_Extension::image($this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 25), "brandlogofile", [], "any", false, false, true, 25), 25, $this->source), $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "name", [], "any", false, false, true, 25), 25, $this->source), ["class" => "logo img-fluid"]);
                yield "
                </div>
            ";
            }
            // line 28
            yield "            <div id=\"navbar-menu\" class=\"dropdown ms-auto ls-no-js-hidden\">
                ";
            // line 29
            if ((((((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aNavigator", [], "any", false, false, true, 29), "load", [], "any", false, false, true, 29), "show", [], "any", false, false, true, 29) == "Y") || (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,             // line 30
($context["aSurveyInfo"] ?? null), "aNavigator", [], "any", false, false, true, 30), "save", [], "any", false, false, true, 30), "show", [], "any", false, false, true, 30) == "Y")) || (((CoreExtension::getAttribute($this->env, $this->source,             // line 31
($context["aSurveyInfo"] ?? null), "bShowClearAll", [], "any", false, false, true, 31) == true) || (CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "bShowClearAll", [], "any", false, false, true, 31) == null)) && (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,             // line 32
($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 32), "showclearall", [], "any", false, false, true, 32) == "on"))) || (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,             // line 33
($context["aSurveyInfo"] ?? null), "aQuestionIndex", [], "any", false, false, true, 33), "bShow", [], "any", false, false, true, 33) == true)) || (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,             // line 34
($context["aSurveyInfo"] ?? null), "alanguageChanger", [], "any", false, false, true, 34), "show", [], "any", false, false, true, 34) == true))) {
                // line 35
                yield "                    <div id=\"navbar-toggler\" class=\"navbar-toggler\" data-bs-toggle=\"dropdown\"
                        data-bs-auto-close=\"outside\" aria-expanded=\"false\">
                        <span class=\"ri-more-fill\"></span>
                    </div>
                    <ul id=\"main-dropdown\" class=\"dropdown-menu dropdown-menu-end\" aria-labelledby=\"navbar-toggler\">
                        ";
                // line 40
                yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/language_changer_top_menu.twig");
                yield "
                        ";
                // line 41
                if (((((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "aNavigator", [], "any", false, false, true, 41), "load", [], "any", false, false, true, 41), "show", [], "any", false, false, true, 41) == "Y") || (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,                 // line 42
($context["aSurveyInfo"] ?? null), "aNavigator", [], "any", false, false, true, 42), "save", [], "any", false, false, true, 42), "show", [], "any", false, false, true, 42) == "Y")) || (((CoreExtension::getAttribute($this->env, $this->source,                 // line 43
($context["aSurveyInfo"] ?? null), "bShowClearAll", [], "any", false, false, true, 43) == true) || (CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "bShowClearAll", [], "any", false, false, true, 43) == null)) && (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,                 // line 44
($context["aSurveyInfo"] ?? null), "options", [], "any", false, false, true, 44), "showclearall", [], "any", false, false, true, 44) == "on"))) || (CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,                 // line 45
($context["aSurveyInfo"] ?? null), "aQuestionIndex", [], "any", false, false, true, 45), "bShow", [], "any", false, false, true, 45) == true))) {
                    // line 46
                    yield "                            <li class=\"dropdown-header text-uppercase\">";
                    yield gT("Survey options");
                    yield "</li>
                        ";
                }
                // line 48
                yield "                        ";
                yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/save_links.twig");
                yield "
                        ";
                // line 49
                yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/question_index_menu.twig");
                yield "
                        ";
                // line 50
                yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/clearall_links.twig");
                yield "
                    </ul>
                ";
            }
            // line 53
            yield "            </div>
            <ul id=\"back-content\" class=\"d-none\"></ul>
        </div>
    </div>
";
        }
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/header/nav_bar.twig";
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
        return array (  106 => 53,  100 => 50,  96 => 49,  91 => 48,  85 => 46,  83 => 45,  82 => 44,  81 => 43,  80 => 42,  79 => 41,  75 => 40,  68 => 35,  66 => 34,  65 => 33,  64 => 32,  63 => 31,  62 => 30,  61 => 29,  58 => 28,  52 => 25,  49 => 24,  47 => 23,  42 => 20,  40 => 19,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/header/nav_bar.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/header/nav_bar.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 19);
        static $filters = array();
        static $functions = array("image" => 25, "include" => 40, "gT" => 46);

        try {
            $this->sandbox->checkSecurity(
                ['if'],
                [],
                ['image', 'include', 'gT'],
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
