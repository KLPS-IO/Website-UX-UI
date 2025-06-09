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

/* ./subviews/navigation/language_changer_top_menu.twig */
class __TwigTemplate_a0aeb6be3c952e7890b5c1e3312e0819 extends Template
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
        // line 24
        yield "
";
        // line 26
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "alanguageChanger", [], "any", false, false, true, 26), "show", [], "any", false, false, true, 26) == true)) {
            // line 27
            yield "
    ";
            // line 29
            yield "    ";
            $context["aLCD"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "alanguageChanger", [], "any", false, false, true, 29), "datas", [], "any", false, false, true, 29);
            // line 30
            yield "
    <!-- Language Changer, top menu version -->
    <li class=\"dropdown-header text-uppercase\">";
            // line 32
            yield gT("Select language");
            yield "</li>
    <li class=\"ls-no-js-hidden form-change-lang dropdown nav-item\">
        <a class=\"nav-link dropdown-toggle\" role=\"button\" data-bs-toggle=\"dropdownCustom\"
           data-bs-target=\"#language-dropdown\" data-navtargetid=\"language-dropdown\">
            ";
            // line 37
            yield "            ";
            yield $this->sandbox->ensureToStringAllowed((($__internal_compile_0 = CoreExtension::getAttribute($this->env, $this->source, ($context["aLCD"] ?? null), "aListLang", [], "any", false, false, true, 37)) && is_array($__internal_compile_0) || $__internal_compile_0 instanceof ArrayAccess && in_array(get_class($__internal_compile_0), CoreExtension::ARRAY_LIKE_CLASSES, true) ? ($__internal_compile_0[CoreExtension::getAttribute($this->env, $this->source, ($context["aLCD"] ?? null), "sSelected", [], "any", false, false, true, 37)] ?? null) : CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aLCD"] ?? null), "aListLang", [], "any", false, false, true, 37), CoreExtension::getAttribute($this->env, $this->source, ($context["aLCD"] ?? null), "sSelected", [], "any", false, false, true, 37), [], "array", false, false, true, 37)), 37, $this->source);
            yield "

        </a>
        <ul class=\"dropdown-menu dropdown-menu-end\" id=\"language-dropdown\">
            ";
            // line 41
            yield Twig\Extension\CoreExtension::include($this->env, $context, "./subviews/navigation/back.twig");
            yield "
            ";
            // line 43
            yield "            ";
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, ($context["aLCD"] ?? null), "aListLang", [], "any", false, false, true, 43));
            foreach ($context['_seq'] as $context["value"] => $context["lang"]) {
                // line 44
                yield "                <li class=\"index-item\">
                    <a href='#' data-limesurvey-lang='";
                // line 45
                yield $this->sandbox->ensureToStringAllowed($context["value"], 45, $this->source);
                yield "' class=\"dropdown-item ls-language-link\">
                        ";
                // line 46
                yield $this->sandbox->ensureToStringAllowed($context["lang"], 46, $this->source);
                yield "
                    </a>
                </li>
            ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['value'], $context['lang'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 50
            yield "        </ul>
    </li>
    <li><hr class=\"dropdown-divider\"></li>
";
        }
        // line 54
        yield "
";
        // line 55
        yield LS_Twig_Extension::registerScript("BasicThemeScripts-TopLanguageChanger", "basicThemeScripts.initTopMenuLanguageChanger('.ls-language-link ', 'form#limesurvey'); ", "POS_POSTSCRIPT");
        yield "

";
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/navigation/language_changer_top_menu.twig";
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
        return array (  105 => 55,  102 => 54,  96 => 50,  86 => 46,  82 => 45,  79 => 44,  74 => 43,  70 => 41,  62 => 37,  55 => 32,  51 => 30,  48 => 29,  45 => 27,  43 => 26,  40 => 24,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/navigation/language_changer_top_menu.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/navigation/language_changer_top_menu.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 26, "set" => 29, "for" => 43);
        static $filters = array();
        static $functions = array("gT" => 32, "include" => 41, "registerScript" => 55);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set', 'for'],
                [],
                ['gT', 'include', 'registerScript'],
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
