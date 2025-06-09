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

/* ./subviews/navigation/language_changer.twig */
class __TwigTemplate_93e947b8e9ca2efbf2c5d8118646ebf8 extends Template
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
        // line 11
        yield "
";
        // line 12
        if ((CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "alanguageChanger", [], "any", false, false, true, 12), "show", [], "any", false, false, true, 12) == true)) {
            // line 13
            yield "    
    ";
            // line 15
            yield "    ";
            $context["aLCD"] = CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "alanguageChanger", [], "any", false, false, true, 15), "datas", [], "any", false, false, true, 15);
            // line 16
            yield "
    ";
            // line 22
            yield "    ";
            $context["htmlOptions"] = ["class" => "form-control", "data-targeturl" => CoreExtension::getAttribute($this->env, $this->source,             // line 24
($context["aLCD"] ?? null), "targetUrl", [], "any", false, false, true, 24)];
            // line 27
            yield "    <!-- Language Changer -->
    <div class=\" ";
            // line 28
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 28), "formgroup", [], "any", false, false, true, 28), 28, $this->source);
            yield " form-change-lang row row-cols-lg-auto g-1\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 28), "formgroup", [], "any", false, false, true, 28), 28, $this->source);
            yield " >
        <div class=\"col-auto\">
            <label class=\"";
            // line 30
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "class", [], "any", false, false, true, 30), "controllabel", [], "any", false, false, true, 30), 30, $this->source);
            yield " col-form-label fw-bold control-label\" ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 30), "controllabel", [], "any", false, false, true, 30), 30, $this->source);
            yield " for=\"lang\">
            <span ";
            // line 31
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source, ($context["aSurveyInfo"] ?? null), "attr", [], "any", false, false, true, 31), "languagechanger", [], "any", false, false, true, 31), 31, $this->source);
            yield ">
                <span class=\"language-icon ri-earth-line\"></span>
                ";
            // line 33
            yield gT("Change language");
            yield "
            </span>
            </label>
        </div>

        <div class=\"col-auto\">
            <div id=\"lang-select\">
                <select class=\"col-form-label\" name=\"lang\" id=\"language-changer-select\">
                    ";
            // line 41
            $context['_parent'] = $context;
            $context['_seq'] = CoreExtension::ensureTraversable(CoreExtension::getAttribute($this->env, $this->source, ($context["aLCD"] ?? null), "aListLang", [], "any", false, false, true, 41));
            foreach ($context['_seq'] as $context["key"] => $context["value"]) {
                // line 42
                yield "                        ";
                if (($context["key"] == CoreExtension::getAttribute($this->env, $this->source, ($context["aLCD"] ?? null), "sSelected", [], "any", false, false, true, 42))) {
                    // line 43
                    yield "                        <option value=\"";
                    yield $this->sandbox->ensureToStringAllowed($context["key"], 43, $this->source);
                    yield "\" selected=\"selected\">";
                    yield $this->sandbox->ensureToStringAllowed($context["value"], 43, $this->source);
                    yield " </option>
                         ";
                } else {
                    // line 45
                    yield "                             <option value=\"";
                    yield $this->sandbox->ensureToStringAllowed($context["key"], 45, $this->source);
                    yield "\">";
                    yield $this->sandbox->ensureToStringAllowed($context["value"], 45, $this->source);
                    yield "</option>
                             ";
                }
                // line 47
                yield "                    ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['key'], $context['value'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 48
            yield "                </select>
            </div>
        <!-- for no js functionality (need form) -->
        ";
            // line 51
            $context["buttonhtmlOptions"] = ["type" => "submit", "value" => "changelang", "name" => "move", "class" => "btn btn-primary ls-language-changer-item "];
            // line 58
            yield "        ";
            yield $this->sandbox->ensureToStringAllowed(CoreExtension::getAttribute($this->env, $this->source, CoreExtension::getAttribute($this->env, $this->source,             // line 59
($context["C"] ?? null), "Html", [], "any", false, false, true, 59), "htmlButton", [gT("Change the language"),             // line 61
($context["buttonhtmlOptions"] ?? null)], "method", false, false, true, 59), 59, $this->source);
            // line 63
            yield "
        </div>
    </div>

    ";
            // line 68
            yield "    ";
            yield LS_Twig_Extension::registerScript("activateLanguageChanger", "activateLanguageChanger(); ", "POS_END");
            yield "
    
";
        }
        return; yield '';
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "./subviews/navigation/language_changer.twig";
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
        return array (  137 => 68,  131 => 63,  129 => 61,  128 => 59,  126 => 58,  124 => 51,  119 => 48,  113 => 47,  105 => 45,  97 => 43,  94 => 42,  90 => 41,  79 => 33,  74 => 31,  68 => 30,  61 => 28,  58 => 27,  56 => 24,  54 => 22,  51 => 16,  48 => 15,  45 => 13,  43 => 12,  40 => 11,);
    }

    public function getSourceContext()
    {
        return new Source("", "./subviews/navigation/language_changer.twig", "/Users/emmamendez/Source/KLPS/Webite-UX-UI/limesurvey/limesurvey/themes/survey/fruity_twentythree/views/subviews/navigation/language_changer.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("if" => 12, "set" => 15, "for" => 41);
        static $filters = array();
        static $functions = array("gT" => 33, "registerScript" => 68);

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set', 'for'],
                [],
                ['gT', 'registerScript'],
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
